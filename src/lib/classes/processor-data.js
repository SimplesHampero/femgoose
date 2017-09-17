/*
* @overview Data structure which gets passed to the processors
*/

const _ = require("lodash");

/*
 * @param {Object} req - Request response object
*/
class ProcessorData {

	/*
	* @param {Object} req - express request object
	*/
	constructor (req) {

		//Merge all data passed by the client in the request
		this.props = _.merge(req.body, req.params, req.query);

		//Store reference to the user
		this.user = req.user || null;

		//API connected devices (Mobile app..) will send x-client header with requests, web context is implied.
		this.client = req.headers["x-client"] || req.client || "web";
	}
}

module.exports = ProcessorData;