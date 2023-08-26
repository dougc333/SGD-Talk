var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
let Step1Element = class Step1Element extends LitElement {
    constructor() {
        super(...arguments);
        this.version = "0.0.0";
    }
    render() {
        return html `
    <h4>First lit element</h4>
    `;
    }
};
__decorate([
    property()
], Step1Element.prototype, "version", void 0);
Step1Element = __decorate([
    customElement('step1-element')
], Step1Element);
export { Step1Element };
//# sourceMappingURL=step1-element.js.map