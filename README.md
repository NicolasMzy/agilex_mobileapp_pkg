# agilex_mobileapp_pkg

## Introduction

This repository concerns the development of the ROS package agilex_mobileapp_pkg allowing to control by web page the robots belonging to the company Agilex Robotics, this concerning for the moment on the Robot scout Mini being equipped with the R&D KIT PRO supplied by the same company 

### Supported robot platforms

- Scout mini with edu Kit Pro

### Prerequisites

- ROS: Kinetic/Melodic/Noetic
- Catkin Workspace
- Rosbridge_server

### Supported environments

- Architecture: x86_64/arm64
- OS: Ubuntu 16.04/18.04/20.04

## Install Package

## Catkin workspace

If the Catkin dependencies are not yet installed, here is the link to set it up:

* [catkin_workspace](http://wiki.ros.org/catkin)

## ROS

If the ROS dependencies are not yet installed, here is the link to set it up:

* [ROS](http://wiki.ros.org/ROS/Installation)

## CAN to USB

- setup gs_usb:

``sudo modprobe gs_usb``

- authorize the communication can:

``sudo ip link set can0 up type can bitrate 500000``

- to see if it's good:

```
sudo apt install can-utils
candump can0
```








