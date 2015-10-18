var dogs = {

    terms: [
        'dogs',
        'puppy',
        'puppies',
        'basset hound',
        'beagle',
        'dog',
        'cute dog'
    ],

    getRandom: function() {
        return this.terms[Math.floor(Math.random() * this.terms.length)];
    }
};

module.exports = dogs;
