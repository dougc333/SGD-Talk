import org.antlr.v4.runtime.Recognizer;
import org.antlr.v4.runtime.BaseErrorListener;
import org.antlr.v4.runtime.Parser;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.RecognitionException;
import java.util.List;
import java.util.Collections;

public class MyErrorListener extends BaseErrorListener{
    public static boolean hasError=false;

    public void snytaxError(
        Recognizer<?,?> recognizer,
        Object offendingSymbol, 
        int line, 
        int charPositionInLine,
        String msg, 
        RecognitionException e)
        {
            hasError = true;
            List<String> stack = ((Parser) recognizer).getRuleInvocationStack();
            Collections.reverse(stack);
            System.out.println("syntax error ");
            System.err.println("token:"+"\""+((Token)offendingSymbol));
            System.err.println("err:"+stack);
        }
}
    
