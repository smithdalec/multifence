This is the core of multifence - a REST API to allow front-end applications to manage multi-device geofences

## Installation
```bash
cd path/to/multifence
npm install
nodemon bin/www
```
## Starting
If using the [smithdalec/fenrir](https://github.com/smithdalec/fenrir) Vagrant box:
```bash
cd path/to/fenrir/apps/multifence
vagrant ssh -c 'nodemon /vagrant/apps/multifence/bin/www'
```
Then navigate to http://multifence.vm:3000 in a browser
