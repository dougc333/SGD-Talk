const cdk = require('@aws-cdk/core')
const myLambda = require('../lib/my_lambda');

class LambdajsStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    new myLambda.MyLambda(this,"MyLambda")

  }
}

module.exports = { LambdajsStack }
