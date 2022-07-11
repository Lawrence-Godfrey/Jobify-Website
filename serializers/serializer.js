import {request} from "express";


class Serializer {

    constructor(requestData, fields, model) {

        this.fields = fields;
        this.model = model;

        this.fieldsToSave = {};
        this.fieldsToReturn = {};
        this.displayNames = {};
        this.instance = null;

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

    getSubset(instance, fields, displayNames) {
        // Get the subset of fields in the instance which are also in fields.
        let subset = {};
        for (let key in fields) {
            if (instance[key]) {
                if (displayNames[key]) {
                    subset[displayNames[key]] = instance[key];
                } else {
                    subset[key] = instance[key];
                }
            }
        }

        return subset;
    }

    async save() {
        this.instance = await this.model.create(this.fieldsToSave);
        return this.instance
    }

    data() {
        if (this.instance) {
            return this.getSubset(this.instance, this.fieldsToReturn, this.displayNames);
        } else {
            return null;
        }
    }

    isValid() {
        return true;
    }

}

export default Serializer;