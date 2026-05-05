import { describe, expect, test, beforeEach } from 'vitest'
import { actualizarRuta, createTrail, deleteTrail, getTrailById, getTrails, getT } from '../src/index.js'
import { Trail } from "../src/traildocument.js";

describe('createTrail', () => { 
    const t = new Trail({
        name: 'Trail 1',
        description: 'larga',
        difficulty: 'Moderate',
        distanceKm: 10,
        elevationGainM: 500,
        durationMinutes: 120,
        location: {
            country: 'Country',
            region: 'Region',
            coordinates: {
                lat: 45.0,
                lng: -90.0
            }
        },
        tags: ['tag1', 'tag2'],
        createdAt: new Date()
    });

    beforeEach(async () => {
        await Trail.deleteMany();
    });

    test("Debería crear un camino correctamente", () => {
       return createTrail(t).then((res) => {
            expect(res.name).toBe(t.name);
            expect(res.description).toBe(t.description);
       });
    });

    test('Debe elminar un camino por su id', () => {
        return createTrail(t).then((res) => {
            return deleteTrail(res._id.toString()).then(() => {
                expect(Trail.findById(res._id)).resolves.toBeNull();
            });
        });
    });

    test('Debe elminar un camino por su id', () => {
        return createTrail(t).then((res) => {
            return deleteTrail(res._id.toString()).then(() => {});
            expect(res.name).toBeNull();
        });
    });

    test('Debe elminar un camino por su id pero da error', () => {
            return deleteTrail("345543").catch((err) => {
                expect(err).toBeInstanceOf(Error);
            });
    });

    test('Actializar un documetn', () => {
        const t2 = new Trail({
        name: 'Trail 12',
        description: 'larga',
        difficulty: 'Moderate',
        distanceKm: 10,
        elevationGainM: 500,
        durationMinutes: 120,
        location: {
            country: 'Country',
            region: 'Region',
            coordinates: {
                lat: 45.0,
                lng: -90.0
            }
        },
        tags: ['tag1', 'tag2'],
        createdAt: new Date()
        });

        return createTrail(t).then((res) => {
            return actualizarRuta(res._id.toString(), t2).catch((err) => {
                expect(err).toBeDefined();
            })
        });
    })

    test('Actializar un documetn', () => {
        const t2 = new Trail({
        name: 'Trail 12',
        description: 'larga',
        difficulty: 'Moderate',
        distanceKm: 10,
        elevationGainM: 500,
        durationMinutes: 120,
        location: {
            country: 'Country',
            region: 'Region',
            coordinates: {
                lat: 45.0,
                lng: -90.0
            }
        },
        tags: ['tag1', 'tag2'],
        createdAt: new Date()
        });

        return createTrail(t).then((res) => {
            return actualizarRuta(res._id.toString(), t2).catch((res2) => {
                expect(res2.name).toBeDefined();
            })
        });
    })

    let bus: Partial<getT> = {difficulty: "Moderate"}

    test('Get por difficulty', () => {
        return createTrail(t).then((res) => {
            return getTrails(bus).then((res) => {
                expect(res[0].name).toBe(t.name);
            })
        })
    })

    test('Get por difficulty', () => {
        return getTrails(bus).then((res) => {
            expect(res).toStrictEqual([]);
        })
    })

    test('Get por id', () => {
        return getTrailById("2342").catch((res) => {
            expect(res).toBeInstanceOf(Error)
        })
    })

    test('Get por id', () => {
        return createTrail(t).then((res) => {
            return getTrailById(res._id.toString()).then((res) => {
                expect(res.name).toBe(t.name)
            })
        })
    })
})