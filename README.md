# Pantheon Sync Helper

This is a small utility that you can use to rsync your files between your local machine and pantheon, when pantheon is in sftp mode. 

## Useage

1. Create a new `pantheon-config.js` file in the top level directory of your project. 
2. Run `pantheon-watch`
3. Done

## Installation

1. Clone this repository to your system
2. Symlink to the index.js file to a directory in your path. 
3. Example: `ln -s ~/src/pantheon-watch/index.js ~/bin/pantheon-watch`


## Config File. 

`port`
This is the ssh port that rsync command should run through. You can find this in the connection information in Pantheon. 

`host`

The host from the connection information in pantheon

`user`
The user from the connection information in pantheon

`watch_dir`
The local directory to watch for changes. Should always be followed by a `/`
Example: `'sites/all/themes/jbc_bootstrap_subtheme/css/'`

`target`
The remote directory to sync to. Should always be followed by a `/`
Example: `'code/sites/all/themes/jbc_bootstrap_subtheme/css/'`

`watch`

An array of directories to watch and sync. Should contain objects with the `watch_dir` and `target` keys. 

Example:

    [
        {
            target: 'code/sites/all/themes/jbc_bootstrap_subtheme/css/',
            watch_dir: 'sites/all/themes/jbc_bootstrap_subtheme/css/'
        },
        {
            target: 'code/sites/default/modules/custom/',
            watch_dir: 'sites/default/modules/custom/'
        }
    ]
