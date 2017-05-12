import expect, { spyOn } from '../index'

describe('A function that was spied on', () => {
  const video = {
    play: () => {}
  }

  let spy
  beforeEach(() => {
    spy = spyOn(video, 'play')
    video.play('some', 'args')
  })

  it('tracks the number of calls', () => {
    expect(spy.calls.length).toEqual(1)
  })

  it('tracks the context that was used', () => {
    expect(spy.calls[0].context).toBe(video)
  })

  it('tracks the arguments that were used', () => {
    expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ])
  })

  it('can be restored', () => {
    expect(video.play).toEqual(spy)
    spy.restore()
    expect(video.play).toNotEqual(spy)
  })
})

describe('toHaveBeenCalled', () => {
  let spy
  beforeEach(() => {
    spy = expect.createSpy()
  })

  it('does not throw when the spy was called', () => {
    spy()
    expect(spy).toHaveBeenCalled()
  })

  it('throws when the spy was not called', () => {
    expect(()=>{
      expect(spy).toHaveBeenCalled()
    }).toThrow('spy was not called')
  })
})

describe('toHaveBeenCalledWith', () => {
  let spy
  beforeEach(() => {
    spy = expect.createSpy()
  })

  it('does not throw when the spy was called with those arguments', () => {
    spy('some', 'args')
    expect(spy).toHaveBeenCalledWith('some', 'args')
  })

  it('throws when the spy was not called', () => {
    expect(()=>{
      expect(spy).toHaveBeenCalledWith('some', 'args')
    }).toThrow(/spy was not called/)
  })

  it('throws when the spy was called with other args', () => {
    spy('other', 'args')
    expect(()=>{
      expect(spy).toHaveBeenCalledWith('some', 'args')
    }).toThrow("spy was not called with [ 'some', 'args' ], but was called with [ [ 'other', 'args' ] ]")
  })
})

describe('A function that was spied on but not called', () => {
  const video = {
    play: () => {}
  }

  let spy
  beforeEach(() => {
    spy = spyOn(video, 'play')
  })

  it('number of calls to be zero', () => {
    expect(spy.calls.length).toEqual(0)
  })

  it('was not called', () => {
    expect(spy).toNotHaveBeenCalled()
  })
})
