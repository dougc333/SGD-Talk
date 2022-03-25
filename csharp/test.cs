

async Task DoSomethingAsync()
{
    int value = 12;
    await Task.Delay(TimeSpan.FromSeconds(1))
    value *=2

    await Task.Delay(TimeSpan.FromSeconds(1))
    Trace.WriteLine(value)
}

DoSomethingAsync()