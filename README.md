# Starter Baseplate

## Description

Build scripts, package.json and SASS baseplate to start prototyping and building projects quickly. Useful for most basic static sites. Tweak and add/remove modules to suit your project.

## Usage

Clone the repo and run `npm install` in the command line to install all dependencies

Use gulp commands to streamline development:

run `gulp serve` to spin up local web server that watches for changes in code and compiles code on the fly.

### Gulp Tasks

##### Javascript
- Concatenates Custom files
- Concatenates Vendor files
- Browserifies required custom modules
- Minifies js

##### CSS
- Compiles SASS into CSS
- Compressed or uncompressed
- Prefixes

##### Images
- Optimises images for the web

##### General
- Local server
- Watches for changes and updates the compiled files
- Build script

## Deployment

Run `gulp build` in the command line to create a `dist` folder of compiled code.

### File Structure
```
/starter
| - /src
    | - index.html  
    | - /assets
        | - js
            | - /custom
                | - /modules
                | - script.js
            | - main.js
            | - main.min.js
        | - /css
        | - /img
        | - /fonts
        | - /icons
| - dist
  | - index.html  
  | - /assets
      | - /js
      | - /css
      | - /img
      | - /fonts
      | - /icons
```
