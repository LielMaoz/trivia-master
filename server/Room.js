const mongoose = require('mongoose');

const User = require('./User');

const roomSchema = new mongoose.Schema({
    roomId: { type: Number, required: true, unique: true },
    roomName: { type: String, required: true, unique: true },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ] /***additional code must be added to protect the information***/,
    roomScore: { type: Number, default: 0 },
    isPlaying: { type: Boolean, default: false },
});

/*roomSchema.path('players').validate(function (value) {
    return value.length <= 4; // Max 4 players
}, 'Room cannot have more than 4 players.');*/

module.exports = mongoose.model('Room', roomSchema);
