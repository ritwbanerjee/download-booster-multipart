# PartDownload

* This is a Sample project aimed at creating a small POC on how a download booster would work.
* The directions followed are as per the guidelines in http://dist.pravala.com/coding/CarnegieCodingCheckMultiGet.pdf

## Installing all dependancies

* Navigate to the folder in your Command Prompt / Terminal
* Run ```npm install``` to install all dependancies
* This will also automatically run the app for you.


## Development server

For development purpose we will be running 2 servers:
- Angular Dev server using Webpack.
- Express Proxy server to query the head request for now. On the long term, the aim is to bypass CORS by routing calls through Node and let Node download the files to our local system.
- Navigate to the folder and Run ```ng serve``` to start the Webpack dev server
- Run ```nodemon server``` to start Express
- For simplicity, you can run ```npm install``` and the ```postinstall``` hook should automatically run the app for you by combining the above two commands
- To run the app, just hit http://localhost:4200.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Environment Settings

- All the environment related settings and comfigurations are found in the folder ```environment\environment.ts``` file.
- Configurable items:
* Chunks
* Total downloadable limit. Change the value in the environment file if you want to download the entire file

### Functionality Available

- Check if the downloadable URL supports Range. If yes, download in parts else download the whole file at once
- Source URL is taken in through Input Box
- Output File Name is taken in through Command Box
- File is downloaded in 4 chunks (configured in environment file)
- Only first 4 MiB of the file is downloaded (Total download size is configured in environment file)
- File is retreived with GET request
- File download in parallel and use RxJS ForkJoin to join the responses
- Any file size is supported
- Invalid Links fails with 500 (Internal Server Error). The server doesnot crash

### Not Supported in this Version

- CORS (Please make sure the file is supporting CORS. The example link works well)
- Download Indicator. No Spinners or progress indicators available now. Please open network tab to see progress
- Validations on URLs







