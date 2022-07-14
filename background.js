chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({url: "chrome://extensions/shortcuts"});
});

chrome.commands.onCommand.addListener(async (command) => {
  try {
    const currentTabs = await chrome.tabs.query({active: true, currentWindow: true});
    const currTab = currentTabs[0];
    const newTab = await chrome.tabs.create({index: currTab.index + 1});
    if (currTab.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
      await chrome.tabs.group({tabIds: newTab.id, groupId: currTab.groupId});
    }
  } catch (error) {
    console.log(`new-tab-to-right failed: ${error}`);
  }
});
