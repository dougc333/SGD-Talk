

import java.util.ArrayList;
import java.util.List;


public class AntlrToProgram extends ExprBaseVisitor<Program>{
    public List<String> semanticErrors;

    @Override
    public Program visitProgram(ExprParser.ProgramContext ctx) {
        // TODO Auto-generated method stub
        Program prog = new Program();
        this.semanticErrors = new ArrayList<String>();
        AntlrToExpression exprVisitor = new AntlrToExpression(semanticErrors);
        for (int i = 0; i < ctx.getChildCount() -1; i++ ){
            if(i == ctx.getChildCount()-1){
                //do nothing we do not want to visit this child and attempt 
                //to convert it to an expression object
                
            }else{
                prog.addExpression(exprVisitor.visit(ctx.getChild(i)));
            }

        }
        return prog;
     }

    
}
