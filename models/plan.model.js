const { Schema, model } = require('mongoose');

const PlanSchema = Schema({
    plan: {
        type: String,
        required: [true, 'The plan is required'],
        unique: true
    }
});

module.exports = model('Plan', PlanSchema);