'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Property extends Model {
  user () {
    this.belongsTo('App/Models/User')
  }

  image () {
    this.hasMany('App/Models/Image')
  }
}

module.exports = Property
