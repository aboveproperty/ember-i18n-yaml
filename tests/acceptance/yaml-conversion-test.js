import { skip } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | yaml conversion');

skip('yaml conversion of translations has worked', function(assert) {

  visit('/');

  andThen(() => {
    console.error("Text was: " + find('h1.title').text());
    assert.equal(find('h1.title').text(), 'Application Title');
  });
});
