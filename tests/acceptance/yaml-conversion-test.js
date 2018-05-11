import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | yaml conversion');

test('yaml conversion of translations has worked', function(assert) {

  visit('/');

  andThen(() => {
    assert.equal(find('h1#title').text(), 'Application Title');
  });
});
