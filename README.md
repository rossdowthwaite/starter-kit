# Starter Baseplate

## Description

Gulpfile, package.json and SASS baseplate to start prototyping and building projects quickly. Useful for most basic static sites. Tweak and add/remove modules to suit your project.

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
- Browserify transpiling
- Babel polyfilling

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
| - /src
    | - index.html  
    | - /assets
        | - js
            | - /custom
                | - /modules    // create custom modules here
                | - script.js   // Update this as main script. Add more files if needed
            | - main.js         // compiled js
            | - main.min.js     // compiled js
        | - /css
        | - /scss               // Replace with own sass Baseplate
            | - sassFolders...
            | - main.scss       // must have this file to compile to css
        | - /img
        | - /fonts
        | - /icons
| - dist                        // Same structure as above without extras
  | - index.html  
  | - /assets
      | - /js
      | - /css
      | - /img
      | - /fonts
      | - /icons
```
### To Do

Sass stuff

### Author

* Ross Dowthwaite
