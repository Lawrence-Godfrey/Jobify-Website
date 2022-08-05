

class Serializer {

    /**
     * Setup the instance with the data from the request,
     * as well as the fields object and the model to save to or get data from.
     * @param {Object} requestData     The request object
     * @param {Object} fields           The fields to save to the instance
     * @param {Object} model           The model to save to or get data from
     */
    constructor(requestData, fields, model) {

        this.fields = fields;
        this.model = model;

        this.fieldsToSave = {};
        this.fieldsToReturn = {};
        this.displayNames = {};
        this.instance = null;
        this.errors = {};

        console.log(this.fields);

        // Loop through the request data and only save the fields which are also in the fields object.
        for (let key in fields) {
            if (this.fields[key]) {
                if (this.fields[key]['readOnly'] && this.fields[key]['readOnly'] === true) {
                        this.fieldsToReturn[key] = requestData[key];
                        if (this.fields[key]['displayName']) {
                            this.displayNames[key] = this.fields[key]['displayName'];
                        }
                } else if (this.fields[key]['writeOnly'] && this.fields[key]['writeOnly'] === true) {
                        this.fieldsToSave[key] = requestData[key];
                } else {
                    this.fieldsToSave[key] = requestData[key];
                    this.fieldsToReturn[key] = requestData[key];

                    if (this.fields[key]['displayName']) {
                        this.displayNames[key] = this.fields[key]['displayName'];
                    }
                }
            }
        }
    }

    /**
     * Get a subset of the fields in the instance which are also in fields.
     * Also use the name in displayNames if possible.
     * @param {Object} sourceObject      The instance to get the subset from
     * @param {Object} fields         The fields to get from the instance
     * @param {Object} displayNames  The display names to use for the fields
     * @returns {Object} subset      The subset of the instance
     */
    getSubset(sourceObject, fields, displayNames) {
        // Get the subset of fields in the instance which are also in fields.
        let subset = {};
        for (let key in fields) {
            if (sourceObject[key]) {
                if (displayNames[key]) {
                    subset[displayNames[key]] = sourceObject[key];
                } else {
                    subset[key] = sourceObject[key];
                }
            }
        }

        return subset;
    }

    /**
     * Get the validated fields to save.
     * @returns {AnyObject} validatedData   The validated fields to save
     */
    validatedData() {
        return this.fieldsToSave;
    }

    /**
     * Save the instance to the database, only saving the fields in fieldsToSave.
     * @returns {Promise}
     */
    async save() {
        if (this.isValid()) {
            try {
                this.instance = await this.model.create(this.validatedData());
                return this.instance;
            } catch (err) {
                console.log(err);
                return null;
            }
        }
    }

    /**
     * Get the data to return to the client from the instance.
     * @returns {{}}
     */
    data() {
        if (this.instance) {
            return this.getSubset(this.instance, this.fieldsToReturn, this.displayNames);
        } else {
            return this.getSubset(this.validatedData(), this.fieldsToReturn, this.displayNames);
        }
    }

    /**
     * Return whether the data is valid or not.
     * @returns {boolean}
     */
    isValid() {
        this.instance = new this.model(this.fieldsToSave);
        const errors = this.instance.validateSync();
        if (errors) {
            // Loop through the error keys and get the message for each.
            for (let key in errors.errors) {
                this.errors[key] = { message: errors.errors[key].message };
            }
            return false;
        } else {
            return true;
        }
    }

}

export default Serializer;