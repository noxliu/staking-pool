![staking](/images/dis_pool.png)


Let's define the per second staking reward value is R.

So Alice final staking reward could be calculated by below:

1st secord = 0

2nd secord = R

3rd secord = R

4th secord = 2R/3

5th secord = R/2

6th secord = R/4

Sum all of them then could get the total is R + R + $ {2R \over 3} $ + $ {R \over 2} $ + $ {R \over 4} $  = $ {41R \over 12} $ 

But this way is not good. It need calculate one's reward every second. The gas consuming is unacceptable.

The better way is just only calculate the how much token could be earned by 1 token. When any user stake or withdraw tokens, just save the currently value and recalculate a new one. Then calculate the user who stake or withdraw token how much tokens earnd now, And add all of these token counts into a map of user balance. Like below:

<font size="3">r<font size="1">x</font></sub></font> is the per token earn value from previous time from now:

<font size="3">r<sub><font size="1">x</font></sub> = r<sub><font size="1">p</font></sub> + $ {R \over S} $</font>

<font size="3">r<sub><font size="1">0</font></sub> = 0</font>

<font size="3">r<sub><font size="1">1</font></sub> = r<sub><font size="1">0</font></sub>  + 0 </font>

<font size="3">r<sub><font size="1">2</font></sub> = r<sub><font size="1">1</font></sub>  + $ {R \over 100} $ </font>

<font size="3">r<sub><font size="1">3</font></sub> = r<sub><font size="1">2</font></sub>  + $ {R \over 200} $ </font>

<font size="3">r<sub><font size="1">4</font></sub> = r<sub><font size="1">3</font></sub>  + $ {R \over 300} $ </font>

<font size="3">r<sub><font size="1">5</font></sub> = r<sub><font size="1">4</font></sub>  + $ {R \over 200} $ </font>

<font size="3">r<sub><font size="1">6</font></sub> = r<sub><font size="1">5</font></sub>  + $ {R \over 400} $ </font>

<font size="3">r<sub><font size="1">8</font></sub> = r<sub><font size="1">6</font></sub>  + $ {R(8-6) \over 400} $ = r<sub><font size="1">6</font></sub>  + $ {R \over 200} $ </font>

<font size="3">r<sub><font size="1">9</font></sub> = r<sub><font size="1">8</font></sub>  + $ {R \over 300} $ </font>

<font size="3">r<sub><font size="1">12</font></sub> = r<sub><font size="1">9</font></sub>  + $ {R(12-9) \over 200} $ = r<sub><font size="1">9</font></sub>  + $ {3R \over 200} $ </font>


We could use <font size="3">r<font size="1">x</font></sub></font> calculate everyone staking rewards:

## Alice:

E(Alice) is the tokens value Alice earned.

Alice stake 100 token when second 2, we need calculate how much tokens Alice earned during second 1 to second 2. 

<font size="3">R<sub><font size="1">1-2</font></sub> = 100(r<sub><font size="1">2</font></sub> - r<sub><font size="1">1</font></sub>) = 100 * $ {R \over 100} $ = R </font>

E(Alice) =  R 

Alice withdraw 100 token when second 4, we need calculate how much tokens Alice earned during second 2 to second 4.

<font size="3">R<sub><font size="1">2-4</font></sub> = 200(r<sub><font size="1">4</font></sub> - r<sub><font size="1">2</font></sub>) = 200($ {R \over 300} $  + $ {R \over 200} $) = $ {5R \over 3} $ </font>

Update E(Alice) :

E(Alice) = E(Alice) + ${5R \over 3}$ = ${8R \over 3}$ 

Alice withdrow the rest 100 tokens when second 6, we need calculate how much tokens Alice earned during second 4 to second 6, then we get the total tokens Alice earned.

<font size="3">R<sub><font size="1">4-6</font></sub> = 100(r<sub><font size="1">6</font></sub> - r<sub><font size="1">4</font></sub>) = 100($ {R \over 400} $  + $ {R \over 200} $) = $ {3R \over 4} $ </font>

Update E(Alice) :

E(Alice) = E(Alice) + ${3R \over 4}$  = ${8R \over 3}$  + ${3R \over 4}$  = ${41R \over 12}$

We could calculate Bob and Carol earn by same way:

## Bob:

<font size="3">R<sub><font size="1">3-9</font></sub> = 100(r<sub><font size="1">9</font></sub> - r<sub><font size="1">3</font></sub>) = 100($ {R \over 300} $  + $ {R \over 200} $ + $ {R \over 400} $+ $ {R \over 200} $+ $ {R \over 300} $) = $ {31R \over 12} $ </font>

## Carol:

<font size="3">R<sub><font size="1">5-6</font></sub> = 200(r<sub><font size="1">6</font></sub> - r<sub><font size="1">5</font></sub>) = 200($ {R \over 400} $) = $ {R \over 2} $ </font>

E(Carol) =  $ {R \over 2} $

<font size="3">R<sub><font size="1">6-8</font></sub> = 300(r<sub><font size="1">8</font></sub> - r<sub><font size="1">6</font></sub>) = 300($ {R \over 200} $) = $ {3R \over 2} $ </font>

Update E(Carol) :

E(Carol) = E(Carol) + ${3R \over 2}$  = ${R \over 2}$  + ${3R \over 2}$  = 2R

<font size="3">R<sub><font size="1">8-12</font></sub> = 200(r<sub><font size="1">12</font></sub> - r<sub><font size="1">8</font></sub>) = 200($ {R \over 300} $ + $ {3R \over 200} $) = $ {11R \over 3} $ </font>

E(Carol) = E(Carol) + ${11R \over 3}$ = 2R + ${11R \over 3}$ =  ${17R \over 3}$

# Contract code



