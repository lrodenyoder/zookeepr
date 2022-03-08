const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
} = require('../lib/animals');
const { animals } = require('../data/animals');
const { text } = require('express');

jest.mock('fs');

test('creates a new animal object', () => {
    const animal = createNewAnimal(
        { name: 'Darlene', id: 'abcdef' },
        animals
    );

    expect(animal.name).toBe('Darlene');
    expect(animal.id).toBe('abcdef');
});

text('filters by query', () => {
    const startingAnimals = [
        {
            id: '3',
            name: 'erica',
            species: 'gorilla',
            diet: 'omnivore',
            personalityTraits: ['quirky', 'rash'],
        },
        {
            id: '4',
            name: 'noel',
            species: 'bear',
            diet: 'carnivore',
            personalityTraits: ['impish', 'sassy', 'brave']
        }
    ];

    const updateAnimals = filterByQuery({ species: 'gorilla' }, startingAnimals);

    expect(updateAnimals.length).toEqual(1);
});

test('finds by id', () => {
    const startingAnimals = [
        {
            id: '3',
            name: 'erica',
            species: 'gorilla',
            diet: 'omnivore',
            personalityTraits: ['quirky', 'rash'],
        },
        {
            id: '4',
            name: 'noel',
            species: 'bear',
            diet: 'carnivore',
            personalityTraits: ['impish', 'sassy', 'brave']
        }
    ];

    const result = findById('3', startingAnimals);

    expect(result.name).toBe('erica');
});

text('validates personality traits', () => {
    const animal = {
        id: '3',
        name: 'erica',
        species: 'gorilla',
        diet: 'omnivore',
        personalityTraits: ['quirky', 'rash'],
    };

    const invalidAnimal = {
        id: '3',
        name: 'erica',
        species: 'gorilla',
        diet: 'omnivore',
    };

    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});