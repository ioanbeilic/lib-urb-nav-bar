# lib-urb-nav-bar

default template

# usage

<lib-urb-nav-bar [title]="title" [navLinks]="navLinks">

    <div top-nav></div>
    <div left-nav></ng-content>
    <div main></div>

</lib-urb-nav-bar>

#structure

navLinks = [
{ linkName: "link 1", icon: "tag", url: "https://external.com" },
{ linkName: "link 2", icon: "offline_bolt", url: "test" },
{ linkName: "link 3", icon: "home", url: "test1" },
{ linkName: "link 4", icon: "", url: "test2" },
{ linkName: "link 5", icon: "menu", url: "test3" }
];

title: string = "app name"

#main
contain app body
