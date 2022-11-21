import java.util.List;
import org.antlr.v4.runtime.Token;
import java.util.ArrayList;

public class AntlrToExpression extends ExprBaseVisitor<Expression> {
    /*
     * Given that all visit_ methods are called topdown, we can be sure
     * the order which we addd declared variables into vars is 
     * identical to the order in the source code file
     * 
     */
    private List<String> vars;
    private List<String> semanticErrors; /*DUPLICATE DECL    OR REFERENCE TO UNDECLARED IDENTIFIER, ADD MISSING DEFAULT PROPERRT PULL IT OFF A CRAWLER */

    public AntlrToExpression(List<String> semanticErrors){
        this.vars = new ArrayList<String>();
        this.semanticErrors = semanticErrors;
    }

    @Override
    public Expression visitAddition(ExprParser.AdditionContext ctx) {

        Expression left = visit(ctx.getChild(0));
        Expression right = visit(ctx.getChild(2));
        return new Addition(left,right);
    }

    @Override
    public Expression visitDeclaration(ExprParser.DeclarationContext ctx) {
        Token idToken = ctx.ID().getSymbol();
        int line = idToken.getLine();
        int column = idToken.getCharPositionInLine()+1;
        
        String id = ctx.getChild(0).getText();
        if (vars.contains(id)){
            semanticErrors.add("Error variable "+id+" alreadu declared line:"+line+" pos:"+column);
        }else{
            vars.add(id);
        }
        String type = ctx.getChild(2).getText();
        int value = Integer.parseInt(ctx.NUM().getText());

        return new VariableDeclaration(id,type,value);


    }

    @Override
    public Expression visitMultiplication(ExprParser.MultiplicationContext ctx) {
        
        Expression left = visit(ctx.getChild(0));
        Expression right = visit(ctx.getChild(2));
        return new Multiplication(left,right);
    
    
    }

    @Override
    public Expression visitNumber(ExprParser.NumberContext ctx) {
        // TODO Auto-generated method stub
        String numText = ctx.getChild(0).getText();
        int num = Integer.parseInt(numText);
        return new Number(num);
    }

    @Override
    public Expression visitVariable(ExprParser.VariableContext ctx) {
        
        Token idToken = ctx.ID().getSymbol();
        int line = idToken.getLine();
        int column = idToken.getCharPositionInLine()+1;
        String id = ctx.getChild(0).getText();
        if (!vars.contains(id)){
            semanticErrors.add("error variable"+id+" not declared");
        }
        return new Variable(id);
    }
    
}
