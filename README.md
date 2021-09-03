
# Spotify-Player

## Table of Contents

<details>
<summary>Click to expand</summary>
  
- [Introduction](#introduction)  
  
- [Environment Variables](#environment-variables)

</details>

## Introduction

Welcome to [Spotify-player](https://spotify-player-opal.vercel.app) where u can search for any song and play it through spotify API (requires premium account).

<table>
  <tr>
    <td align="left">
<img src="https://i.imgur.com/o5Erg6p.png" align="center" /></td>
   
  </tr>
</table>

## Environment variables

| Name                | Description                                                                    | Example                                                     |
| ------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| SPOTIFY_API_URI      | spotify API uri                                                           | `https://api.spotify.com/v1`     |
| SPOTIFY_API_TOKEN   | spotify API uri to receive refresh_token |`https://accounts.spotify.com/api/token`
| NEXTAUTH_SECRET     | some secret key for your next-auth setup | `192334184120` |
| NEXTAUTH_URL        | The URI of the app                                                             | `https://spotify-player-opal.vercel.app/`                           |
|SPOTIFY_CLIENT_ID | spotify client id [dashboard](https://developer.spotify.com/dashboard/applications) | `e3asd3e790v3aas4199aasd057abbe0a82006`|
|SPOTIFY_CLIENT_SECRET | spotify client secret [dashboard](https://developer.spotify.com/dashboard/applications) | `e3asd3e790v3aas4199aasd057abbe0a82006`|

## Deploy this yourself

- Clone to your computer.

  - `clone this repo`
  
  - `cd spotify-player`
  
  - `npm install`

- Create .env.local in the root directory of your project, add env variables required.

- Start a dev server

  - `npm run dev`
