# Bot-discord-Archi-SI
Repository pour le travail en équipe en cours d'Architecture des SI. </br>
Le groupe est composé de Bilal Abbad, Lætitia Bouvier, Nicolas Louisin et Nicolas Meneux. </br>

Pour lancer le bot, si le deploiment azure devait ne pas fonctionner, il faut faire dans l'invité de commande du dossier contenant le code source la manipulation suivante : </br>
>	- npm install </br>
>	- attendre que tout s'intalle </br>
>	- npm start </br>
>	- vérifier dans la console quel bot s'est allumé </br>
>	- apprécier nos fonctionnalités </br>

Nous vous présentons donc ici un bot Discord pouvant effectuer diverses actions dont voici les commandes : </br>

### Pour avoir la Météo : </br>
	- !weather : Temps actuel sur une ville (" !weather Paris ") 
	- !forecast : Prévision sur 5 jours sur une ville (" !forecast Paris ") 

### Pour faire des recherches sur Spotify : </br>
    - !spotifyAll : recherche les 3 résultats les plus probants  et affiche le titre l'album l'artiste (" !spotifyAll love ") 
    - !spotifySong : recherche une chanson, une track (" !spotifySong never gonna give you up ") 
    - !spotifyArtist : recherche un artiste (" !spotifyArtist Jul ") 
    - !spotifyAlbum : recherche un album (" !spotifyAlbum best-of ") 
    
### Pour traduire quelque chose grâce à Google traduction : </br>
    - !translate 'langue de retour' 'votre message' : permet de traduire la recherche dans la langue de retour (" !translate fr hello world ")
    - quelques exemples de langues disponibles : fr (français), en (anglais), de (allemand), ru (russe), etc... 
    - Voici la liste complète des langues supportées : https://cloud.google.com/translate/docs/languages
        * exemple : !translate en Cela fonctionne-t-il ? 
        * réponse : Does it work? 

### Pour poster un tweet sur notre Twitter ( "@I_am_the_BOT ") : </br>
    - !tweet "Votre message" : permet d'envoyer un message sur Twitter (limitation à 140 caractères) (" !tweet WHAT IS MY PURPOSE ? ")
    - Lors d'un tweet à @I_am_the_BOT , le bot poste le tweet sur le channel 

### Pour recherche une vidéo ou un vidéaste sur Youtube : </br>
    - !youtubeAll : lance la recherche et renvoie les 3 résultats les plus probants (" !youtubeAll who let the dogs out ")
    - !youtubeVideo : lance la recherche et renvoie les 3 premières vidéos (" !youtubeVideo best hanspinner compilation ")
    - !youtubeUser : lance la recherche et renvoie les 3 premiers utilisateurs (" !youtubeUser Squeezie ") 
    - !youtubePlaylist : lance la recherche et renvoie les 3 premières playlist (" !youtubePlaylist top 10 anime betrayal ")

### Pour jouer avec un Pokemon : </br>
    - !pokemon "le nom en anglais de votre pokemon, ou le numéro du pokedex" : change le nom du bot, son image, et écrit les informations du pokemon correspondant (" !pokemon mewtwo ") (" !pokemon 1" donnera bulbizare)
    - !pokemon evolve : fait évoluer le pokemon si c'est possible 

### Le lien pour lancer le déploiment Azure : http://archibot-blnn.azurewebsites.net/
