# Blue-Sky-Starter

examples for MERN Stack for project 2

## Quick Start

```
cd server
npm install
npm start
```

## Development

```
cd server
npm install
npm run dev
```

## Local Env

```
cd client
npm install
npm run dev
```

---

Tony O has cloned this file on April 4/2/2025 ---

[Directory tree](./tree.txt)

[Flow Chart](flowChart.md)

# Time-Lapse
<i><b>(these are bash script processes, the intent is to migrate to javascript)</b></i>

Recommended naming convention for images <b>###_image_yyyymmddThhmmssssZ.jpeg</b>, where ### = camera id to three places, ex. <i>054_image_20250404T234000326Z.jpeg</i>

make a folder called <i>rename</i> and copy the images you wish to rename to it.
also copy <i>rename_files.sh</i> to that folder
cd to that folder and
run the following command in a bash terminal in VS-Code

```
bash rename_files.sh .
```
This will remane the files in numerical order starting at 001.  It will also create a JSON index file, ex.
```
{"original": "133_image_20250402T141939618Z.jpeg", "renamed": "001.jpeg"}
```

[<i>ffmpeg</i>](https://ffmpeg.org/) must be installed to create the video, here is a command to run in bash terminal.  Windows and Apple should be the same....but check the website.
```
ffmpeg -stream_loop 2 -framerate 10 -i %03d.jpeg -c:v libx264 -pix_fmt yuv420p YOUR_OUTPUT_FILENAME.mp4