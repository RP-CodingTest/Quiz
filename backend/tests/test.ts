/* global it context */

import { expect } from 'chai';

import parse from '../src/read';

context('Gets converted csv data', () => {
  it('should get an array of objects', () => {
    const data = parse();

    expect(data).to.be.an('array');
    expect(data.length).to.equal(4);
    expect(data[0]).to.deep.equal({
      Question: 'How often do you drink?',
      '6 points': 'once a week',
      '4 points': 'twice a week',
      '2 points': 'three times a week',
      '0 points': 'everyday'
    });
  });
});
