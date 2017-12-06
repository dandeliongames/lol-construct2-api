# lol-construct2-api
This API allows game developers to use Construct 2 plugins to communicate with the LoL platform.
You test API changes as you go in the sample C2 game at ..\samples\lol-construct-api-sample.

## Development Environment
It runs on a EC2 Windows instance because C2 does not support Mac OS.

## Getting Access to the EC 2 Instance
Select the construct2-dev-server instance in the EC2 console and hit 'Connect'. That will give you most of the information you need to login via the Remote Desktop client.

The password is in 1Password under construct2-dev-server.

:notebook:The construct2 EC2 instance shares a pem with the Unity Build Server. This is because it was created from the same AMI.

The Remote Desktop client is pretty good:
https://itunes.apple.com/us/app/microsoft-remote-desktop/id715768417?mt=12

## Resources
The Construct 2 documentation is excellent. Please see https://www.scirra.com/manual/69/plugins to understand how plugins work and how they are created and delivered. You need to grok this stuff before you start changing a plugin.

## Basic Development Process

Each plugin consists of five files:
* common.js - no use so far
* edittime.js - defines and documents the interface for the plugin
* runtime.js - implements the behavior of the plugin
* info.xml - meta data about the plugin. Must match the information in edittime.js.
* PluginIcon.ico - icon for the plugin

The file structure in the repo for plugins is really strange and repetitive. It also makes zipping up the plugin really easy. Don't judge...

A plugin is added to a C2 project by dropping the c2addon file on the project. This installs it underneath the Construct 2 install path, as in:
C:\Program Files\Construct 2\exporters\html5\plugins\lol-questions

Since you are developing on a shared EC2 instance that is for C2 development the current files are already there.

I generally edit the files in the repo folder and then copy them into the plugins folder under Program Files. If you want to have a normal edit -> debug cycle you need to put Construct into dev mode by following the instructions at
https://www.scirra.com/manual/15/sdk. This makes Construct pick up your plugin changes each time you use the 'Run Layout' button in the C2 IDE to run your game on port 50000. Once again, this is already set up on the C2 instance.

:bomb:    
C2 does NOT refresh the plugins for export. Each time you want to export and run externally you must close and open the project.    
:bomb:

## Create a Plugin (c2addon)
Make sure to update the version and description in edittime.js and info.xml.

I am referring to lol-questions in examples. It works the same for lol-main.

When you are ready to release, you need to:
* Open a file explorer window to:
* github\gamedevelopers-resources\lol-construct2-api\plugins\lol-questions
* Select both files and info.xml
* Send to a compressed folder
* Rename to lol-questions.c2addon

It may help to compare the new c2addon to the old one.

## Verify it
Before you publish it:
* Close C2
* Copy the old edittime and runtime files to C:\Program Files\Construct 2\exporters\html5\plugins\lol-questions
* Open the sample project in C2
* Drag the newly created c2addon file(s) onto the IDE. Note the version.
* Export the game and test

## Deploy It
The c2addons are included in the lol-construct2-resources.zip within the Resources section of docs.legendsoflearning.com.

We also keep a build of the sample game on S3:
aws s3 sync --delete lol-construct-api-sample/ s3://game-harness/sample-games/lol-construct-api-sample --acl public-read


## Dependency on Vanilla API
The Construct 2 API depends on the Vanilla API

:rage: The way Construct 2 plugins include third party code in the runtime.js is to literally include the minimized text inside a try block. This seems horrible. But there isn't any index.html to add a script tag to.

If we find ourselves modifying the Vanilla API fairly often then some sort of build automation will be in order.
