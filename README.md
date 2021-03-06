# Generator-Misha

## Development status:

[![npm version](https://badge.fury.io/js/generator-misha.svg)](https://badge.fury.io/js/generator-misha)
[![Coverage Status](https://coveralls.io/repos/github/marcelinobadin/generator-misha/badge.svg?branch=master)](https://coveralls.io/github/marcelinobadin/generator-misha?branch=master)
[![Build Status](https://travis-ci.org/marcelinobadin/generator-misha.svg?branch=master)](https://travis-ci.org/marcelinobadin/generator-misha)
[![Dev Dependency Status](https://david-dm.org/marcelinobadin/generator-misha.svg?style=flat-square)](https://david-dm.org/marcelinobadin/generator-misha)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/generator-misha)

# Why to choose this generator?

This Yeoman Generator is entire based on [generator-m-ionic](https://github.com/mwaylabs/generator-m-ionic). It implements the best practices and style guidance from [John Pappa](https://github.com/johnpapa/angular-styleguide)
and [Todd Motto](https://github.com/toddmotto/angular-styleguide).

The main difference is that you organize your project by features and not by technical components as it is on generator-m-ionic. This way facilitates the development among developers mainly when they work as an Agile Team.

Every module you create has at least one main feature (<mouduleName>/main) where you will find your templates and scripts created during the module generation. Modules can have names like ```myModules.subModule``` that will create a new module myModules (if it not exist yet) and add a submodule subModule to it.

You can create new features using the subgenerator ```yo misha:feature <feature> [<module>]``` which will create a new directory for your feature with a standard template and controller. The module parameter is optional, and defaults to
_base_ module.

# More info

[Read the Wiki for more information](https://github.com/marcelinobadin/generator-misha/wiki)
