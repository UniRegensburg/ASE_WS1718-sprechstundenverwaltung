# Sprechstunde.ur.de

### Ziel dieses Projekts: Entwicklung einer webbasierten Anwendung zur Unterstützung der organisatorischen und thematischen Arbeitsabläufe im Kontext universitärer Sprechstunden

## Link zur gehosteten Version: https://asesprechstunde.firebaseapp.com/ 
Demo Accounts: 
- Demodozent1:
Email:      DemoDozent@UR.de
Passwort:   4321

- Demodozent2:
Email:      DemoDozentin@UR.de
Passwort:   1234

- Demostudent
Email:      DemoStudent@UR.de
Passwort:   1234



## Kurzbeschreibung:
Dieses Repository beinhaltet eine webbasierte Anwendung, die die Planung von Sprechstunden sowohl für Dozierende als auch Studierende verbessern soll. Die wichtigsten Ziele waren hierbei eine einfachere Möglichkeit zur Vereinbarung von Sprechstundenterminen sowie eine Unterstützung bei der Vorbereitung von Sprechstunden durch einen vorhergehenden Austausch von wichtigen Informationen.
Wesentliche Features der Anwendung:

- *Login* - Möglichkeit zur Nutzung als Studierender oder Dozierender
- *Anlegen* und *löschen* von Terminen als Dozent
- *Buchen* und *Absagen* von Terminen als Student
- *Kommunikation* von zusätzlichen Informationen zur Sprechstunde durch ein *Notizsystem*


## Anleitung zur Nutzung:


### Benötigte Software:

Um die Anwendung zu starten, sind zuerst folgende Softwarekomponenten erforderlich:

- node.js bzw. npm - Installation unter  https://nodejs.org/en/download/ 
- Angular CLI - Installation unter: https://github.com/angular/angular-cli
- Internetbrowser zum Abrufen der Anwendung


### Anwendung starten:

- Klonen dieses Repositories auf einen lokalen Rechner
- Im lokalen Repository in den Ordner *ASE_WS1718-sprechstundenverwaltung\Documentation\Client\ssur-client* wechseln
- In der Kommandozeile / Terminal den Befehl 'npm install' ausführen, um alle benötigten Pakete (*node_modules*) zu installieren
- Im selben Ordner den Befehl 'ng serve -o' ausführen --> Anwendung wird kompiliert und ist anschließend im Browser unter //localhost:4200 aufrufbar
- Weitere Informationen zur Nutzung als Student oder Dozent finden sie im User Manual:  https://github.com/UniRegensburg/ASE_WS1718-sprechstundenverwaltung/blob/master/Documentation/docs/Manual.md


### Urheber:
Johannes Dengler (johannes.dengler@stud.uni-regensburg.de)
Paul Winderl (paul.winderl@stud.uni-regensburg.de)
Ramona Völkel (ramona.voelkel@stud.uni-regensburg.de)
