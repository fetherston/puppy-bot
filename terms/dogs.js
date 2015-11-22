var dogs = {

    terms: [
        'dogs',
        'puppy',
        'puppies',
        'basset hound',
        'beagle',
        'dog',
        'cute dog',
        'corgi',
        'husky puppy',
        'shiba inu'
    ],

    random: function() {
        return this.terms[Math.floor(Math.random() * this.terms.length)];
    }
};

module.exports = dogs;
