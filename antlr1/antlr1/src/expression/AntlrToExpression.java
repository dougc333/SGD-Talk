package expression;
import antlr.ExprBaseVisitor;
import antlr.ExprParser.AdditionContext;
import antlr.ExprParser.DeclarationContext;
import antlr.ExprParser.MultiplicationContext;
import antlr.ExprParser.NumberContext;
import antlr.ExprParser.VariableContext;

import java.util.ArrayList;
import java.util.List;

import org.antlr.v4.runtime.Token;

public class AntlrToExpression extends ExprBaseVisitor<Expression> {
    private List<String> vars;
    private List<String> semanticErrors;
    public AntlrToExpression(List<String> semanticErrors){
        this.semanticErrors = semanticErrors;
        this.vars = new ArrayList<String>();
    }

    @Override
    public Expression visitAddition(AdditionContext ctx) {
        // TODO Auto-generated method stub
        Expression left = visit(ctx.getChild(0));
        Expression right = visit(ctx.getChild(2));
        return new Addition(left,right);
    }

    @Override
    public Expression visitDeclaration(DeclarationContext ctx) {
        // TODO Auto-generated method stub
        Token idToken = ctx.ID().getSymbol();
        int line = idToken.getLine();
        int column = idToken.getCharPositionInLine() + 1;


        String id = ctx.getChild(0).getText();
        if (vars.contains(id)){
            semanticErrors.add("Error: variable "+id+" already declared line:"+ line+" , col:"+column);
        }
        else{
            vars.add(id);
        }
        String type = ctx.getChild(2).getText();
        int value = Integer.parseInt(ctx.NUM().getText());
        return new VariableDeclaration(id, type, value);

    }

    @Override
    public Expression visitMultiplication(MultiplicationContext ctx) {
        // TODO Auto-generated method stub
        Expression left = visit(ctx.getChild(0));
        Expression right = visit(ctx.getChild(2));
        return new Multiplication(left, right);
    }

    @Override
    public Expression visitNumber(NumberContext ctx) {
        // TODO Auto-generated method stub
        int value = Integer.parseInt(ctx.getChild(0).getText());
        return new Number(value);
    }


    @Override
    public Expression visitVariable(VariableContext ctx) {
        Token idToken = ctx.ID().getSymbol();
        int line = idToken.getLine();
        int column = idToken.getCharPositionInLine()+1;

        String id = ctx.getChild(0).getText();
        if (!vars.contains(id)){
            semanticErrors.add("Error variable"+id+" not declared("+line+","+column+")");
        }

        return new Variable(id);


    }

}
