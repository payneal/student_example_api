const supertest = require('supertest-as-promised');
const app = require('../app');
const server = supertest(app);

const chai = require('chai');
const expect = chai.expect;

describe('server tests', function () {
    describe('get /students', function () {
        it('should return all students', function (done) {
            server.get('/students')
                .send()
                .expect(200)
                .then(function (res) {
                    expect(res.body).to.eql([
                        {
                            id:'afdb8735-853a-4049-b442-226e6c803b10',
                            name: 'Annie Oakley',
                            age: 16,
                            grade: 11
                        },{
                            id: "12523f64-96c6-4ed6-95cb-195ea2945e8e",
                            name: 'Billy Barnes',
                            age: 15,
                            grade: 10
                        },{
                            id: 'c03cbc26-48e7-422b-a39f-b969e7d7eeed',
                            name: 'Charlie Coleman',
                            age: 18,
                            grade:12
                        },{
                            id: '2654663d-9575-4259-8335-3dc15b5b2019',
                            name: 'Dennis Dopf',
                            age: 17,
                            grade: 12
                        }
                    ])
                    done();
                });
        })
    });

    describe('get /students/:id', function () {
        it('/studshould return each student record', function () {
            //TODO: make this test work by modifying the code and maybe only the date fields below
            return server.get('/students/afdb8735-853a-4049-b442-226e6c803b10')
                .send()
                .expect(200)
                .then(function (res) {
                    expect(res.body).to.eql({
                        id: 'afdb8735-853a-4049-b442-226e6c803b10',
                        name: 'Annie Oakley',
                        age: 16,
                        grade: 11,
                        attempts: [
                            {
                                student_id: 'afdb8735-853a-4049-b442-226e6c803b10',
                                test_id: 'ae88ff5a-6adc-4906-9e84-09136476e7c1',
                                score: 1920,
                                date: '2016-05-01'
                            },
                            {
                                student_id: 'afdb8735-853a-4049-b442-226e6c803b10',
                                test_id: 'ae88ff5a-6adc-4906-9e84-09136476e7c1',
                                score: 2210,
                                date: '2016-05-15'
                            },
                            {
                                student_id: 'afdb8735-853a-4049-b442-226e6c803b10',
                                test_id: 'ae88ff5a-6adc-4906-9e84-09136476e7c1',
                                score: 2030,
                                date: '2016-05-31'
                            },
                            {
                                student_id: 'afdb8735-853a-4049-b442-226e6c803b10',
                                test_id: '6486f998-0cdd-4da3-8730-2c1167217d4d',
                                score: 31,
                                date: '2016-06-10'
                            }
                        ]
                    })
				
                });
        })
    });

    describe('/tests', function () {
        it('should return each test grouped by tests and dates', function () {
            return server.get('/tests')
                .send()
                .expect(200)
                .then(function (res) {
                    expect(res.body).to.eql({
                        "ae88ff5a-6adc-4906-9e84-09136476e7c1": {
                            name: 'SAT',
                            maxScore: 2400,
                            scores: {
                                "2016-05-01": [
                                    {student_id: 'afdb8735-853a-4049-b442-226e6c803b10', score: 1920},   
                                    {student_id: 'c03cbc26-48e7-422b-a39f-b969e7d7eeed', score: 2000}   
                                ],
                                "2016-05-15": [
                                    {student_id: 'afdb8735-853a-4049-b442-226e6c803b10', score: 2210},   
                                    {student_id: '12523f64-96c6-4ed6-95cb-195ea2945e8e', score: 1810},   
                                ],
                                "2016-05-31": [
                                    {student_id: 'afdb8735-853a-4049-b442-226e6c803b10', score: 2030},   
                                    {student_id: 'c03cbc26-48e7-422b-a39f-b969e7d7eeed', score: 2150}
                                ]
                            }
                        },
                        "6486f998-0cdd-4da3-8730-2c1167217d4d": {
                        	name: 'ACT',
							maxScore: 36,
							scores: {
								"2016-06-10": [
									{student_id: "afdb8735-853a-4049-b442-226e6c803b10", score: 31},
									{student_id: "c03cbc26-48e7-422b-a39f-b969e7d7eeed", score: 26}
								],
								"2016-06-17": [
									{student_id: "12523f64-96c6-4ed6-95cb-195ea2945e8e", score: 21},
									{student_id: "c03cbc26-48e7-422b-a39f-b969e7d7eeed", score: 21},
									{student_id: "2654663d-9575-4259-8335-3dc15b5b2019", score: 36}
								],
								"2016-06-24": [
									{student_id: "12523f64-96c6-4ed6-95cb-195ea2945e8e", score: 27},
									{student_id: "c03cbc26-48e7-422b-a39f-b969e7d7eeed", score: 33}
								]	
							}
						}
                    });	
				})
        });
    });
});
