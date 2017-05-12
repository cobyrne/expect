import expect from '../index'

describe('toThrow', () => {
  it('does not throw when an exception was thrown', () => {
    expect(()=>{
      throw new Error("boom!")
    }).toThrow()
  })

  it('throws when the an exception was not thrown', () => {
    expect(()=>{
      expect(()=>{}).toThrow()
    }).toThrow('Expected [Function] to throw an error')
  })

  describe('with an expected message', () => {
    it('does not throw when the message matches', () => {
      expect(()=>{
        throw new Error("boom!")
      }).toThrow(/boom/)
    })

    it('throws when no exception was thrown', () => {
      expect(()=>{
        expect(()=>{}).toThrow(/boom/)
      }).toThrow('Expected [Function] to throw an error')
    })

    it('throws when the message does not match', () => {
      expect(()=>{
        expect(()=>{
          throw new Error("boom!")
        }).toThrow(/bang/)
      }).toThrow("Expected [Function] to throw /bang/. Actually threw 'boom!'")
    })
  })
})

describe('toNotThrow', () => {
  it('throws when an exception was thrown', () => {
    expect(()=>{
      expect(()=>{ throw new Error("boom!") }).toNotThrow()
    }).toThrow("Expected [Function] to not throw an error. Actually threw 'boom!'")
  })

  it('does not throw when an exception was not thrown', () => {
    expect(()=>{}).toNotThrow()
  })

  describe('with an expected message', () => {
    it('throws when the message matches', () => {
      expect(()=>{
        expect(()=>{ throw new Error("boom!") }).toNotThrow(/boom/)
      }).toThrow('Expected [Function] to not throw /boom/')
    })

    it('does not throw when no exception was thrown', () => {
      expect(()=>{}).toNotThrow(/boom/)
    })

    it('does not throw when the message does not match', () => {
      expect(()=>{ throw new Error("boom!") }).toNotThrow(/bang/)
    })
  })
})