#!/usr/local/bin/node
var config = require(`${process.cwd()}/pantheon-config.js`).default;
var watch = require('watch');
var Rsync = require('rsync');
//config.watch_dir
//config.target


if( config.watch_dir && config.target) {
  start_sync(config.watch_dir, config.target, config);
}
if( config.watch.length ) {
  config.watch.forEach( (watch) => {
    start_sync(watch.watch_dir, watch.target, config);
  })
}

  function start_sync(source, target, config) {
    const rsync = get_sync(source, target, config);
    const sync = () => {
      rsync.execute(function(error, code, cmd) {
        console.log(`synced ${source}`);
      });
    }
    create_watch(source, sync);
    sync();
  }
  
  function get_sync(source, target, config) {
    return new Rsync()
    .shell(`ssh -p ${config.port || 22}`)
    .flags('rlvz')
    .set('stats')
    .source(source)
    .destination(`${config.user}@${config.host}:${target}`);
  }

  function create_watch(watch_dir, sync) {
    watch.createMonitor(watch_dir, (monitor) => {
      console.log(`Watching ${watch_dir} for changes.`)
      monitor.on("created", function (f, stat) {
        console.log(`Detected addition of ${f}`);
        sync();
      });
      monitor.on("changed", function (f, curr, prev) {
        console.log(`Detected change in ${f}`);
        sync();
      });
      monitor.on("removed", function (f, stat) {
        console.log(`Detected ${f} deletion`);
        sync();
      });
    });
  }