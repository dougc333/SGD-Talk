public class AntlrToExpression extends ExprBaseVisitor<Expression> {

    @Override
    public Expression visitAddition(ExprParser.AdditionContext ctx) {
        // TODO Auto-generated method stub
        return super.visitAddition(ctx);
    }

    @Override
    public Expression visitDeclaration(ExprParser.DeclarationContext ctx) {
        // TODO Auto-generated method stub
        return super.visitDeclaration(ctx);
    }

    @Override
    public Expression visitMultiplication(ExprParser.MultiplicationContext ctx) {
        // TODO Auto-generated method stub
        return super.visitMultiplication(ctx);
    }

    @Override
    public Expression visitNumber(ExprParser.NumberContext ctx) {
        // TODO Auto-generated method stub
        return super.visitNumber(ctx);
    }

    @Override
    public Expression visitVariable(ExprParser.VariableContext ctx) {
        // TODO Auto-generated method stub
        return super.visitVariable(ctx);
    }
    
}
