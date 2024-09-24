import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";
import Prayer from "./Prayer";
import {  useEffect } from "react";


import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
// moment.locale("ar-dz")

export default function MainContaint() {


  const [timings, setTimings] = useState("");
  const [today, setToday] = useState();
  const [selectCity, setSelectCity] = useState({
    displayName: "مكه المكرمه",
    apiName: "makkah al Mukarramah",
  });
  const avaliablecity = [
    {
      displayName: "مكه المكرمه",
      apiName: "makkah al Mukarramah",
    },
    {
      displayName: "الرياض",
      apiName: "Riyadh",
    },
    {
      displayName: "الدمام",
      apiName: "Dammam",
    },
  ];
  const [nxtpry, setNxtpry] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");
  const prayerarr = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const gettimings = async () => {
    const response = await axios.get(
      ` https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectCity.apiName}`
    );
    setTimings(response.data.data.timings);
  };

  useEffect(() => {
    gettimings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCity]);
  // timer update
  useEffect(() => {
    let interval = setInterval(() => {
      countDown();
    }, 1000);

    const t = moment();
    setToday(t.format("llll"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const countDown = () => {
    const momentNow = moment();
    let pryIdx = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      pryIdx = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      pryIdx = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      pryIdx = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      pryIdx = 4;
    } else {
      pryIdx = 0;
    }

    setNxtpry(pryIdx);
    const nxtPryObj = prayerarr[pryIdx];
    const nxtPryTim = timings[nxtPryObj.key];
    const nxtTimPryMom = moment(nxtPryTim, "hh:mm");
    let remianTime = moment(nxtPryTim, "hh:mm").diff(momentNow);
    if (remianTime < 0) {
      const midnigt = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fjrToMid = nxtTimPryMom.diff(moment("00:00:00", "hh:mm:ss"));
      const totalDiff = midnigt + fjrToMid;
      remianTime = totalDiff;
    }
    const durTim = moment.duration(remianTime);
    setRemainingTime(
      `${durTim.hours()}:${durTim.minutes()}:${durTim.seconds()}`
    );
  };

  const handleChange = (event) => {
    const cityObj = avaliablecity.find((city) => {
      return city.apiName == event.target.value;
    });
    setSelectCity(cityObj);
  };
  return (
    <>
      
      <Grid container>
        <Grid xs={6}>
          <div>
            <h5>{today}</h5>
            <h2>{selectCity.displayName}</h2>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h5 style={{textAlign:"center"}}>متبقي حتي صلاه {prayerarr[nxtpry].displayName}</h5>
            <h2 style={{textAlign:"center"}}>{remainingTime}</h2>
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Stack
        direction={"row"}
        justifyContent={"center"}
        maxWidth={"90%"}
        gap={2}
        flexWrap={"wrap"}
        mx={"auto"}
      >
        <Prayer
          name={"الفجر"}
          time={timings.Fajr}
          img={
            "https://cdn.vectorstock.com/i/1000v/73/47/silhouette-of-muslim-man-praying-vector-47227347.avif"
          }
        />
        <Prayer
          name={"الظهر"}
          time={timings.Dhuhr}
          img={
            "https://cdn.vectorstock.com/i/1000v/09/27/muslim-doing-salah-salat-shalat-sholaat-sujud-vector-12010927.avif"
          }
        />
        <Prayer
          name={"العصر"}
          time={timings.Asr}
          img={
            "https://cdn.vectorstock.com/i/1000v/69/77/praying-in-ramadan-kareem-vector-20756977.avif"
          }
        />
        <Prayer
          name={"المغرب"}
          time={timings.Maghrib}
          img={
            "https://gurukul.org/wp-content/uploads/2023/02/From-my-hands-to-his-heart.png"
          }
        />
        <Prayer
          name={"العشاء"}
          time={timings.Isha}
          img={
            "https://cdn.vectorstock.com/i/1000v/42/63/muslim-man-praying-in-desert-vector-38334263.avif"
          }
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{ minWidth: 120, mt: 2, mb: 10 }}
        justifyContent="center"
      >
        <FormControl style={{ width: "30%" }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ fontFamily: "Lemonada" }}
          >
            city
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={setSelectCity.displayName}
            label="city"
            sx={{ fontFamily: "Lemonada" }}
            onChange={handleChange}
          >
            {avaliablecity.map((city) => {
              return (
                <MenuItem
                  key={city.apiName}
                  value={city.apiName}
                  sx={{ fontFamily: "Lemonada", direction: "rtl" }}
                >
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
