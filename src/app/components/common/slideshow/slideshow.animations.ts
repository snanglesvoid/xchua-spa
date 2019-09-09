import { trigger, style, animate, state, transition } from '@angular/animations'

export const animations = [
  trigger('fade', [
    state('out', style({ opacity: 0.0, 'pointer-events': 'none' })),
    state('in', style({ opacity: 1.0, 'pointer-events': 'all' })),
    transition('void => out', [style({ opacity: 0 })]),
    transition('in => out', [
      style({ opacity: 1.0 }),
      animate('{{time}} 0ms {{easingFunction}}'),
    ]),
    transition('out => in', [
      style({ opacity: 0.0 }),
      animate('{{time}} 0ms {{easingFunction}}'),
    ]),
    transition('void => in', [
      style({ opacity: 0.0 }),
      animate('{{time}} 0ms {{easingFunction}}'),
    ]),
    // transition('void => out', [
    //   style({ opacity: 0.0 }),
    // ]),
  ]),
  // trigger('flip', [
  //   state('out', style({ opacity: 0.0, 'pointer-events': 'none' })),
  //   state('in', style({ opacity: 1.0, 'pointer-events': 'all' })),
  //   transition('in => out', [
  //     style({ transform: 'rotateY(0deg)' }),
  //     animate('{{time}} 0ms ease-in', style({ transform: 'rotateY(90deg)' })),
  //     // style({ transform: 'rotate(-90deg)', opacity: 0 }),
  //   ]),

  //   transition('void => in', [
  //     style({ transform: 'rotateY(-90deg)', opacity: 1 }),
  //     animate('{{time}} {{time}} ease-out'),
  //     style({ transform: 'rotateY(0deg)' }),
  //     // style({ transform: 'rotateY(0deg)'} )
  //   ]),
  //   transition('out => in', [
  //     style({ transform: 'rotateY(-90deg)', opacity: 1 }),
  //     animate('{{time}} {{time}} ease-out'),
  //     style({ transform: 'rotateY(0deg)' }),
  //     // style({ transform: 'rotateY(0deg)'} )
  //   ]),
  //   transition('void => out', [style({ opacity: 0 })]),
  // ]),
  // trigger('slideLeft', [
  //   state('out', style({ opacity: 0.0, 'pointer-events': 'none' })),
  //   state('in', style({ opacity: 1.0, 'pointer-events': 'all' })),
  //   transition('in => out', [
  //     style({ left: '0', opacity: 1 }),
  //     animate('{{time}} {{easingFunction}}', style({ left: '100%' })),
  //   ]),
  //   transition('out => in', [
  //     style({ left: '-100%', opacity: 1 }),
  //     animate('{{time}} {{easingFunction}}', style({ left: '0' })),
  //   ]),
  //   transition('void => in', [
  //     style({ left: '-100%', opacity: 1 }),
  //     animate('{{time}} {{easingFunction}}', style({ left: '0' })),
  //   ]),
  // ]),
  // trigger('slideRight', [
  // state('out', style({ opacity: 0.0, 'pointer-events': 'none' })),
  //   state('in', style({ opacity: 1.0, 'pointer-events': 'all' })),
  //   transition('in => out', [
  //     style({ left: '0', opacity: 1 }),
  //     animate('{{time}} {{easingFunction}}', style({ left: '-100%' })),
  //   ]),
  //   transition('out => in', [
  //     style({ left: '100%', opacity: 1 }),
  //     animate('{{time}} {{easingFunction}}', style({ left: '0' })),
  //   ]),
  //   transition('void => in', [
  //     style({ left: '100%', opacity: 1 }),
  //     animate('{{time}} {{easingFunction}}', style({ left: '0' })),
  //   ]),
  // ]),
]
