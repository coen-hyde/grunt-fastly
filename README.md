# grunt-fastly

> A Grunt plugin to purge cache from Fastly

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fastly --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fastly');
```

## The "fastly" task

### Overview
In your project's Gruntfile, add a section named `fastly` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  fastly: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.key
Type: `String`

Your API key from Fastly.

#### options.host
Type: `String`

The host you wish to purge from when purging individual files.

#### options.purgeAll
Type: `Boolean`
Default value: `false`

Purge all cached files from a cache. If this value is true, a serice id must also be provided.

#### options.serviceId
Type: `String`

The service you wish to purge all the files from. Only required when option `purgeAll` is `true`.

#### options.concurrentPurges
Type: `Number`
Default value: `10`

The number of concurrent purges allowed at any one time.

### Usage Examples

#### Purge All
In this example, all cached files will be purged from the production service.

```js
grunt.initConfig({
  fastly: {
    options: {
      key: 'your api key'
    },
    production: {
      options: {
        purgeAll: true,
        serviceId: 'production service id from Fastly'
      }
    }
  },
})
```

#### Purge selected files
In this example, we'll purge only selected files from the example.com host.

```js
grunt.initConfig({
  fastly: {
    options: {
      key: 'your api key'
    },
    example: {
      options: {
        host: 'example.com',
        urls: [
          'path/to/asset1.jpg',
          'path/to/asset2.jpg'
        ]
      }
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
