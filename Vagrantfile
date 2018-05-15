# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y npm
    npm install -g npm
    npm install -g n
    n 8
    npm install -g npm
  SHELL
end
