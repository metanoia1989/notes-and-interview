fish比起bash，有补全的功能，补全的很智能。补全是默认显示在敲入命令的后面的，在我用的过程中，fish是现代的shell，而bash是上世纪的产品。

# $PATH
You can do so directly in config.fish, like you might do in other shells with .profile. 
> Where's .bashrc? ~/.config/fish/config.fish
设置PATH环境变量 
> set -x PATH $PATH /sbin/
--export or just -x.

erase a variable with -e or --erase
> set -e MyVariable

A faster way is to modify the $fish_user_paths universal variable
> set -U fish_user_paths /usr/local/bin $fish_user_paths
普遍变量，在其他的shell一样通用。

# Prompt 提示符
Unlike other shells, there is no prompt variable like PS1. fish executes a function with the name fish_prompt
```sh
function fish_prompt
    echo "New Prompt % "
end
 New Prompt %  
```
Colors can be set via set_color , passing it named ANSI colors, or hex RGB values
```
 function fish_prompt
      set_color purple
      date "+%m/%d/%y"
      set_color FF0
      echo (pwd) '>'
      set_color normal
  end
02/06/13
/home/tutorial > 
```

You can choose among some sample prompts by running fish_config prompt

# Autoloading Functions 自动加载函数
When fish encounters a command, it attempts to autoload a function for that command, by looking for a file with the name of that command in ~/.config/fish/functions/.

```sh
> cat ~/.config/fish/functions/ll.fish
function ll
    ls -lh $argv
end
```

ssh的config配置补全补丁，就是通过这个自动加载函数完成的。

# Syntax Highlighting
- Invalid commands are colored red by default
- When the command becomes valid, it is shown in a different color

# Pipes and Redirections
stdin and stdout can be redirected via the familiar < and >. Unlike other shells, stderr is redirected with a caret ^
> grep fish < /etc/shells > ~/output.txt ^ ~/errors.txt

You can pipe between commands with the usual vertical bar
> echo hello world | wc

# Variables
Variable substitution also occurs in double quotes, but not single quotes:
```sh
> echo "My current directory is $PWD"
My current directory is /home/tutorial
> echo 'My current directory is $PWD'
My current directory is $PWD
```

Unlike other shells, fish has no dedicated syntax for setting variables. Instead it has an ordinary command: set, which takes a variable name, and then its value.
```sh
> set name 'Mister Noodle'
> echo $name
Mister Noodle
```
$name would have been made into a list of two elements.

Unlike other shells, variables are not further split after substitution. so that is the argument that was passed to mkdir, spaces and all. Other shells use the term "arrays", rather than lists.
```sh
> mkdir $name
> ls
Mister Noodle
```

# Exit Status
Unlike other shells, fish stores the exit status of the last command in $status instead of $?.
Zero is considered success, and non-zero is failure.
```sh
> false
> echo $status
1
```

# Lists
The set command above used quotes to ensure that Mister Noodle was one argument. If it had been two arguments, then name would have been a list of length 2. 
fish的所有变量都是列表，一些变量只有参数，也是一个列表，列表宽度为1. 

Lists cannot contain other lists: there is no recursion. A variable is a list of strings, full stop.

Get the length of a list with count: `count $PATH`

access individual elements with square brackets. Indexing starts at 1 from the beginning, and -1 from the end
```sh
> echo $PATH
/usr/bin /bin /usr/sbin /sbin /usr/local/bin
> echo $PATH[1]
/usr/bin
> echo $PATH[-1]
/usr/local/bin
```

access ranges of elements, known as "slices:"
```sh
> echo $PATH[1..2]
/usr/bin /bin
> echo $PATH[-1..2]
/usr/local/bin /sbin /usr/sbin /bin
```

iterate over a list (or a slice) with a for loop:
```sh
> for val in $PATH
    echo "entry: $val"
  end
entry: /usr/bin/
entry: /bin
entry: /usr/sbin
entry: /sbin
entry: /usr/local/bin
```

Lists adjacent to other lists or strings are expanded as cartesian products unless quoted (see Variable expansion)
```sh
> set -l a 1 2 3
> set -l 1 a b c
> echo $a$1
1a 2a 3a 1b 2b 3b 1c 2c 3c
> echo $a" banana"
1 banana 2 banana 3 banana
> echo "$a banana"
1 2 3 banana
```

# Command Substitutions
Unlike other shells, fish does not use backticks ` for command substitutions. Instead, it uses parentheses
```sh
> echo In (pwd), running (uname)
In /home/tutorial, running FreeBSD
```

Command substitutions are not expanded within quotes. Instead, you can temporarily close the quotes, add the command substitution, and reopen them, all in the same argument
```sh
> touch "testing_"(date +%s)".txt"
> ls *.txt
testing_1360099791.txt
```

# Combiners (And, Or, Not)
Unlike other shells, fish does not have special syntax like && or || to combine commands. Instead it has commands and, or, and  not.
```sh
> cp file1.txt file1_bak.txt; and echo "Backup successful"; or echo "Backup failed"
Backup failed
```

# Conditionals (If, Else, Switch)
```sh
if grep fish /etc/shells
    echo Found fish
else if grep bash /etc/shells
    echo Found bash
else
    echo Got nothing
end

switch (uname)
case Linux
    echo Hi Tux!
case Darwin
    echo Hi Hexley!
case FreeBSD NetBSD DragonFly
    echo Hi Beastie!
case '*'
    echo Hi, stranger!
end
```

# Loops
While loops
```sh
> while true
    echo "Loop forever"
end
Loop forever
Loop forever
Loop forever
...
```

For loops can be used to iterate over a list.
```sh
> for file in *.txt
    cp $file $file.bak
end
```

Iterating over a list of numbers can be done with seq
```sh
> for x in (seq 5)
    touch file_$x.txt
end
```

# Functions 
Unlike other shells, arguments are not passed in "numbered variables" like $1, but instead in a single list $argv.
```sh
> function say_hello
     echo Hello $argv
  end
> say_hello
Hello
> say_hello everybody!
Hello everybody!
```

对于列表，shell可以很方便的取出其中的参数

Unlike other shells, fish does not have aliases or special prompt syntax. Functions take their place.
You can list the names of all functions with the functions keyword (note the plural!). 
```sh
> functions
., N_, abbr, alias, cd, contains_seq, delete-or-exit, dirh, dirs,
down-or-search, edit_command_buffer, eval, export, fish_clipboard_copy,
fish_clipboard_paste, fish_config, fish_default_key_bindings,
fish_default_mode_prompt, fish_fallback_prompt, fish_hybrid_key_bindings,
fish_indent, fish_key_reader, fish_md5, fish_mode_prompt, fish_prompt,
fish_sigtrap_handler, fish_update_completions, fish_vi_cursor,
fish_vi_key_bindings, fish_vi_mode, funced, funcsave, grep, help, history,
hostname, isatty, la, ll, ls, man, math, nextd, nextd-or-forward-word, open,
popd, prevd, prevd-or-backward-word, prompt_hostname, prompt_pwd, psub, pushd,
realpath, say_hello, seq, setenv, string, suspend, trap, type, umask,
up-or-search, vared,
```

You can see the source for any function by passing its name to functions
```sh
functions ll
# Defined in /usr/share/fish/functions/ll.fish @ line 4
function ll --description 'List contents of directory using long format'
	ls -lh $argv
end
```