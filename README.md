
Ziel dieser Übung ist es, die Verwendung eines Caches am Beispiel Azure Cache for Redis zu erlernen und zu verstehen, wie Sie Daten aus externen API-Aufrufen cachen können.
Aufgabe: Entwickeln Sie eine Node.js-Anwendung, die Wetterdaten von der Meteomatics Wetter API abruft.

Wenn ein Benutzer das aktuelle Wetter für einen bestimmten Ort anfragt, soll Ihre Anwendung folgende Schritte durchlaufen:
1. Überprüfen Sie zuerst, ob der Wetterbericht für diesen Ort im Azure Cache for Redis vorhanden ist.
2. Wenn die Daten im Cache vorhanden sind, geben Sie diese Daten zurück.
3. Wenn die Daten nicht im Cache vorhanden sind, rufen Sie die Daten von der Meteomatics Wetter API ab, speichern Sie sie im Cache für zukünftige Anfragen und geben Sie sie an den Benutzer zurück.

Stellen Sie sicher, dass die Daten im Cache nach einer bestimmten Zeit (zum Beispiel einer Stunde) ungültig werden, um sicherzustellen, dass Benutzer keine veralteten Wetterdaten sehen.
Erläutern Sie am Beispiel der Wetterdaten die möglichen Nachteile von Caching, gehen Sie auf die Aspekte Geschwindigkeit, Daten, Kosten, Sicherheit sowie Nutzererfahrung ein.

Hinweise:
- Erstellen Sie sich einen kostenlosen Account bei Meteomatics. Mit diesem können Sie bis zu 500 APICalls pro Tag absetzen. https://www.meteomatics.com/en/api/getting-started/
- Sie können die ioredis-Bibliothek verwenden, um eine Verbindung zu Azure Cache for Redis
herzustellen und Daten darin zu speichern und abzurufen.
- Sie können die axios-Bibliothek oder eine ähnliche HTTP-Client-Bibliothek verwenden, um Anfragen an die Meteomatics Wetter API zu senden.
- Stellen Sie sicher, dass Sie alle erforderlichen Fehlerbehandlungen durchführen und die gespeicherten Wetterdaten korrekt formatieren, bevor Sie sie an den Benutzer zurückgeben.
- Achten Sie darauf, wie Sie sensible Informationen wie API-Schlüssel und Redis-Verbindungsdaten behandeln und speichern. Es ist ratsam, diese Art von Daten in Umgebungsvariablen zu speichern, anstatt sie direkt in Ihrem Quellcode zu codieren.
