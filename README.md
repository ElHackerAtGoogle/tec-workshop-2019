# Tec Workshop 2019 - Deploying a real time Node.js web app with Google Cloud Platform

## Prerequisites:

**Note**: If you follow the step 0 on this guide you'll have all the prerequisites complete.

- [You have Git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Have Node.js installed in your machine](https://nodejs.org/en/download/)
- [Be familiar with Typescript/Javascript](https://www.typescriptlang.org/docs/home.html)

## Step 0: Get started with GCP and Setup your Project

### Get your Student $50 USD credit for GCP

Pick a code from [this spreadsheet](https://docs.google.com/spreadsheets/d/12gOna-CvN92v_CB7dA8Coz1ECQk8SKIwWW0giruMtFE/edit#gid=1942022057), once you claim a code please mark it as used by formatting it with ~~strikethrough~~. Then claim it here with your personal google account [Redeem Link](https://console.cloud.google.com/education)

### Setup a new project

1. Visit the [GCP Dashboard](https://console.cloud.google.com/home/dashboard)
2. Create a new Project
3. Open the GCP Console

## Step 1: Clone the project repo

```
git clone https://github.com/ElHackerAtGoogle/tec-workshop-2019.git
```

## Step 2: Deploy your app to GCP

1. Run the following command from your project's base directory to deploy the app to GCP

**Note:** You might have to update `src/game.ts` file to use the prod env WebSocket url to your project id.

```
cd tec-workshop-2019/
gcloud app deploy
```

**Note:** This will take several minutes to finish.

2. Open your application already hosted in GCP at `https://YOUR_PROJECT_ID.appspot.com`

```
gcloud app browse
```

# GCP Place Project

## Project Overview

This project replicates the social game createdd by Reddit called [r/Place](http://reddit.com/r/place). It involves a grid of 1000x1000 pixels where each user can choose a 2D position and a color from 16 available colors.

### Requirements

- Render a 1000x1000 pixels canvas
- A User can click a single pixel within the canvas to select a 2d position.
- After user selected a position a 16 color palette shows up, user can select a single color from the palette.
- The selected pixel it's drawn with the selected color.
- Multiple users can interact with the same canvas, all client's/user's canvas instances get updated realtime.
- The canvas data its stored server side.

#### 16 Color Palette
- ![#FFFFFF](https://placehold.it/15/ffffff/000000?text=+) `#FFFFFF`
- ![#E4E4E4](https://placehold.it/15/E4E4E4/000000?text=+) `#E4E4E4`
- ![#888888](https://placehold.it/15/888888/000000?text=+) `#888888`
- ![#222222](https://placehold.it/15/222222/000000?text=+) `#222222`
- ![#FFA7D1](https://placehold.it/15/FFA7D1/000000?text=+) `#FFA7D1`
- ![#E50000](https://placehold.it/15/E50000/000000?text=+) `#E50000`
- ![#E59500](https://placehold.it/15/E59500/000000?text=+) `#E59500`
- ![#A06A42](https://placehold.it/15/A06A42/000000?text=+) `#A06A42`
- ![#E5D900](https://placehold.it/15/E5D900/000000?text=+) `#E5D900`
- ![#94E044](https://placehold.it/15/94E044/000000?text=+) `#94E044`
- ![#02BE01](https://placehold.it/15/02BE01/000000?text=+) `#02BE01`
- ![#00D3DD](https://placehold.it/15/00D3DD/000000?text=+) `#00D3DD`
- ![#0083C7](https://placehold.it/15/0083C7/000000?text=+) `#0083C7`
- ![#0000EA](https://placehold.it/15/0000EA/000000?text=+) `#0000EA`
- ![#CF6EE4](https://placehold.it/15/CF6EE4/000000?text=+) `#CF6EE4`
- ![#820080](https://placehold.it/15/820080/000000?text=+) `#820080`


## Tech stack

- Node.js
- Express.js
- Typescript
- WebSockets
- HTML Canvas
- GCP for hosting


## Challenges for you after the workshop

- Persistently store the canvas data server side with a database
- Optimize storage size. You might notice that we use a 16 color palette, and there's a reason for that, you can represent all 16 colors with only `4 bits`! If you store the `1000x1000` picture information with `4 bits` colors, you'll need to store `4x1000x1000` = `4,000,000 bits` = `500 kilobytes` for the whole image, which is very nice. Hints: Look for javascript's bitwise operators, and [Dataview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
- Make it so that users are not annonymous (have accounts)
- Add systems to deter abuse, for example adding a restriction to only submit new data every 10 minutes per user.

## Extra resources

- [GCP Documentation](https://cloud.google.com/gcp/getting-started/)
- [Node.js](https://nodejs.org/en/docs/)
- [Typescript](https://www.typescriptlang.org/docs/home.html)
- [WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Express.js](https://expressjs.com/)
