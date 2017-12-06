# lol-construct2-api
This API allows game developers to use Construct 2 plugins to communicate with the LoL platform.
You test API changes as you go in the sample C2 game at ..\samples\lol-construct-api-sample.

## Resources
The Construct 2 documentation is excellent. Please see https://www.scirra.com/manual/69/plugins to understand how plugins work and how they are created and delivered. You need to grok this stuff before you start changing a plugin.

## Basic Development Process

Each plugin consists of five files:
* common.js - no use so far
* edittime.js - defines and documents the interface for the plugin
* runtime.js - implements the behavior of the plugin
* info.xml - meta data about the plugin. Must match the information in edittime.js.
* PluginIcon.ico - icon for the plugin

A plugin is added to a C2 project by dropping the c2addon file on the project. This installs it underneath the Construct 2 install path, as in:
C:\Program Files\Construct 2\exporters\html5\plugins\lol-questions

Since you are developing on a shared EC2 instance that is for C2 development the current files are already there.
