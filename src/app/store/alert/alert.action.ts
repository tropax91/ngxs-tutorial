export class ShowSuccessAlert {
  static readonly type = '[Alert] Show Success';
  constructor(public text: string) {}
}

export class ShowErrorAlert {
  static readonly type = '[Alert] Show Error';
  constructor(public text: string) {}
}

export class ShowWarningAlert {
  static readonly type = '[Alert] Show Warning';
  constructor(public text: string) {}
}

export class ShowInfoAlert {
  static readonly type = '[Alert] Show Info';
  constructor(public text: string) {}
}
