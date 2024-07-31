'use strict';

import fs from 'fs';
import ini from 'ini';
import _ from 'lodash';

interface Config {
  [key: string]: any;
}

/**
 * @private
 * @function readConfig
 *
 * @description Reads file and parses ini
 *
 * @param {string} filename
 * @param {boolean} mustExist throws exception on missing
 *
 * @returns {object}
 */
function readConfig(filename: string, mustExist: boolean): Config {
  try {
    return ini.parse(fs.readFileSync(filename, 'utf8'));
  } catch (e) {
    if (mustExist) {
      throw e;
    }
    return {};
  }
}

/**
 * @public
 * @function configReader
 *
 * @description Reads and merge multiple configuration files
 *              Files passed in first take the highest precedence.
 *
 * @example: configReader(['a.ini', 'b.ini'])
 *           if a.ini and b.ini have same config var, a.ini is used
 *
 * if mustPass is true and no files exist, returns empty object {}
 *
 * @param {array|string} filenames
 * @param {boolean} mustExist raises error if filename is missing
 *
 * @returns {object}
 */
class ConfigReader {
  private configData: Config = {};

  constructor(filenames: string | string[], mustExist: boolean) {
    if (!filenames) {
      throw new Error('no config filenames specified');
    }

    if (!_.isArray(filenames)) {
      filenames = [filenames];
    }

    const configs = _.map(filenames, (filename) => readConfig(filename, mustExist));

    _.each(configs, (c) => {
      this.configData = {...this.configData, ...c};
    });

    _.each(this.configData, (values, key) => {
      (this as any)[key] = values;
    });
  }

  getString(section: string, option: string, def_val?: string): string {
    try {
      const sec = this.configData[section];
      if (sec === undefined) {
        throw new Error(`no section: [${section}] for: ${option}`);
      }
      const val = sec[option];
      if (val === undefined) {
        throw new Error(`config not found: [${section}].${option}`);
      }
      return String(val).trim();
    } catch (e) {
      if (typeof def_val === 'undefined') {
        throw e;
      }
      return def_val;
    }
  }

  getNumber(section: string, option: string, def_val?: number): number {
    const val = this.getString(section, option, def_val?.toString());
    if (isNaN(Number(val))) {
      throw new Error(`config [${section}].${option} NaN: ${val}`);
    }
    return Number(val);
  }

  getBoolean(section: string, option: string, def_val?: boolean): boolean {
    const val = this.getString(section, option, def_val?.toString());

    switch (String(val).toLowerCase()) {
      case 'true':
      case 'yes':
      case 'on':
      case '1':
        return true;
      case 'false':
      case 'no':
      case 'off':
      case '0':
        return false;
      default:
        throw new Error(`config [${section}].${option} not bool: ${val}`);
    }
  }
}

export default new ConfigReader([
  __dirname+'/default.ini'
], true);
