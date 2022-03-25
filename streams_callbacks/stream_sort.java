import java.util.List;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class stream_sort {
    public static void main(String []args){
        List<String> list = Arrays.asList("a","B","C","0","1000");
        List<String> sorted = list.stream().sorted().collect(Collectors.toList());
        sorted.forEach(System.out::println);
    }   
}
