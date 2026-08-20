import { describe, expect, it } from 'vitest';
import { checkEmail, isProbablyValidEmail } from '../emailValidation';

describe('checkEmail', () => {
  it('accepts ordinary business addresses', () => {
    const result = checkEmail('khush@oltaflock.ai');

    expect(result.ok).toBe(true);
    expect(result.email).toBe('khush@oltaflock.ai');
    expect(result.domain).toBe('oltaflock.ai');
    expect(result.kind).toBe('business');
  });

  it('normalises case and surrounding whitespace', () => {
    expect(checkEmail('  Khush@Oltaflock.AI ').email).toBe('khush@oltaflock.ai');
  });

  it('accepts plus addressing, dots and subdomains', () => {
    for (const email of [
      'first.last@example.co.uk',
      'sales+roi@example.com',
      'user@mail.team.example.io',
      "o'brien@example.com",
    ]) {
      expect(checkEmail(email).ok).toBe(true);
    }
  });

  it('allows role addresses, which are normal in B2B', () => {
    expect(checkEmail('info@example.com').ok).toBe(true);
    expect(checkEmail('sales@example.com').ok).toBe(true);
  });

  it('tags free providers as personal but still accepts them', () => {
    const result = checkEmail('someone@gmail.com');

    expect(result.ok).toBe(true);
    expect(result.kind).toBe('personal');
  });

  it.each([
    ['empty string', ''],
    ['whitespace only', '   '],
    ['no at sign', 'nobody.example.com'],
    ['no domain', 'nobody@'],
    ['no local part', '@example.com'],
    ['no tld', 'nobody@example'],
    ['a space inside', 'no body@example.com'],
    ['a comma', 'a,b@example.com'],
    ['angle brackets', '<nobody@example.com>'],
    ['trailing dot on the domain', 'nobody@example.com.'],
    ['a hyphen starting the domain', 'nobody@-example.com'],
  ])('rejects %s', (_label, email) => {
    expect(checkEmail(email).ok).toBe(false);
  });

  it('rejects misplaced and doubled dots', () => {
    expect(checkEmail('.nobody@example.com').reason).toBe('dot-placement');
    expect(checkEmail('nobody.@example.com').reason).toBe('dot-placement');
    expect(checkEmail('no..body@example.com').reason).toBe('dot-placement');
  });

  it('rejects over-long addresses', () => {
    expect(checkEmail(`${'a'.repeat(65)}@example.com`).reason).toBe('local-too-long');
    expect(checkEmail(`${'a'.repeat(250)}@${'b'.repeat(250)}.com`).reason).toBe('too-long');
  });

  it('rejects disposable inboxes', () => {
    for (const email of ['x@mailinator.com', 'x@guerrillamail.com', 'x@YOPMAIL.com']) {
      const result = checkEmail(email);
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('disposable');
    }
  });

  it('rejects non-string input', () => {
    expect(checkEmail(undefined).ok).toBe(false);
    expect(checkEmail(null).ok).toBe(false);
    expect(checkEmail(42).ok).toBe(false);
    expect(checkEmail({}).ok).toBe(false);
  });

  it('always carries a message when it rejects, and none when it accepts', () => {
    expect(checkEmail('broken').message).toBeTruthy();
    expect(checkEmail('good@example.com').message).toBeNull();
  });
});

describe('isProbablyValidEmail', () => {
  it('mirrors checkEmail', () => {
    expect(isProbablyValidEmail('good@example.com')).toBe(true);
    expect(isProbablyValidEmail('bad@')).toBe(false);
  });
});
